
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useStaffAuth } from '@/contexts/StaffAuthContext';
import { Upload, Download, CheckCircle, XCircle, X } from 'lucide-react';

interface CSVRow {
  [key: string]: string;
}

interface ValidationError {
  row: number;
  field: string;
  message: string;
}

const BulkImport = () => {
  const { toast } = useToast();
  const { user } = useStaffAuth();
  const [csvData, setCsvData] = useState<CSVRow[]>([]);
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [isImporting, setIsImporting] = useState(false);
  const [fileName, setFileName] = useState<string>('');
  const [importResults, setImportResults] = useState<{
    successful: number;
    failed: number;
    errors: string[];
  } | null>(null);

  const requiredFields = [
    'name', 'description', 'category', 'unit', 'price', 
    'stock', 'weight_volume', 'manufacturer'
  ];

  const categories = ['Prescription', 'OTC & Wellness', 'Vitamins & Supplements', 'Medical Devices'];
  const units = ['Tablet', 'Capsule', 'Bottle', 'Syrup', 'Pack'];

  const downloadTemplate = () => {
    const headers = [
      'name', 'description', 'category', 'brand', 'unit', 'price', 'mrp',
      'weight_volume', 'manufacturer', 'requires_prescription', 'stock',
      'expiration_date', 'tags', 'is_active'
    ];

    const sampleData = [
      'Paracetamol 500mg', 'Pain relief tablet', 'OTC & Wellness', 'Generic',
      'Tablet', '5.00', '6.00', '500mg', 'Pharma Corp', 'false', '100',
      '2025-12-31', 'pain relief,fever', 'true'
    ];

    const csvContent = [
      headers.join(','),
      sampleData.join(',')
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'product_import_template.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const parseCSV = (text: string): { headers: string[], data: CSVRow[] } => {
    const lines = text.split('\n').filter(line => line.trim());
    if (lines.length === 0) return { headers: [], data: [] };

    const headers = lines[0].split(',').map(header => header.trim().toLowerCase());
    const data = lines.slice(1).map((line, index) => {
      const values = line.split(',').map(value => value.trim().replace(/^"|"$/g, ''));
      const row: CSVRow = {};
      headers.forEach((header, i) => {
        row[header] = values[i] || '';
      });
      row._rowIndex = (index + 2).toString();
      return row;
    });

    return { headers, data };
  };

  const validateCSVData = (data: CSVRow[]): ValidationError[] => {
    const errors: ValidationError[] = [];

    data.forEach((row, index) => {
      const rowNumber = index + 1;

      // Check required fields
      requiredFields.forEach(field => {
        if (!row[field] || row[field].trim() === '') {
          errors.push({
            row: rowNumber,
            field,
            message: `${field.replace('_', ' ')} is required`
          });
        }
      });

      // Validate category
      if (row.category && !categories.includes(row.category)) {
        errors.push({
          row: rowNumber,
          field: 'category',
          message: `Category must be one of: ${categories.join(', ')}`
        });
      }

      // Validate unit
      if (row.unit && !units.includes(row.unit)) {
        errors.push({
          row: rowNumber,
          field: 'unit',
          message: `Unit must be one of: ${units.join(', ')}`
        });
      }

      // Validate price
      if (row.price) {
        const price = parseFloat(row.price);
        if (isNaN(price) || price < 1) {
          errors.push({
            row: rowNumber,
            field: 'price',
            message: 'Price must be a valid number ≥ 1'
          });
        }
      }

      // Validate MRP
      if (row.mrp) {
        const mrp = parseFloat(row.mrp);
        const price = parseFloat(row.price);
        if (isNaN(mrp) || mrp < 0) {
          errors.push({
            row: rowNumber,
            field: 'mrp',
            message: 'MRP must be a valid number ≥ 0'
          });
        } else if (!isNaN(price) && mrp < price) {
          errors.push({
            row: rowNumber,
            field: 'mrp',
            message: 'MRP must be greater than or equal to Price'
          });
        }
      }

      // Validate stock
      if (row.stock) {
        const stock = parseInt(row.stock);
        if (isNaN(stock) || stock < 0) {
          errors.push({
            row: rowNumber,
            field: 'stock',
            message: 'Stock must be a valid number ≥ 0'
          });
        }
      }

      // Validate requires_prescription
      if (row.requires_prescription && !['true', 'false'].includes(row.requires_prescription.toLowerCase())) {
        errors.push({
          row: rowNumber,
          field: 'requires_prescription',
          message: 'requires_prescription must be "true" or "false"'
        });
      }

      // Validate is_active
      if (row.is_active && !['true', 'false'].includes(row.is_active.toLowerCase())) {
        errors.push({
          row: rowNumber,
          field: 'is_active',
          message: 'is_active must be "true" or "false"'
        });
      }

      // Validate expiration_date format if provided
      if (row.expiration_date && row.expiration_date.trim() !== '') {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(row.expiration_date)) {
          errors.push({
            row: rowNumber,
            field: 'expiration_date',
            message: 'expiration_date must be in YYYY-MM-DD format'
          });
        }
      }
    });

    return errors;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      toast({
        title: "Error",
        description: "Please upload a CSV file",
        variant: "destructive",
      });
      return;
    }

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const { headers, data } = parseCSV(text);
      
      setCsvHeaders(headers);
      setCsvData(data);
      
      const errors = validateCSVData(data);
      setValidationErrors(errors);
      setImportResults(null);
    };
    reader.readAsText(file);
  };

  const clearCSVData = () => {
    setCsvData([]);
    setCsvHeaders([]);
    setValidationErrors([]);
    setImportResults(null);
    setFileName('');
    // Reset file input
    const fileInput = document.getElementById('csv-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim() + '-' + Math.random().toString(36).substr(2, 6);
  };

  const handleImport = async () => {
    if (validationErrors.length > 0) {
      toast({
        title: "Validation Errors",
        description: "Please fix all validation errors before importing",
        variant: "destructive",
      });
      return;
    }

    setIsImporting(true);
    let successful = 0;
    let failed = 0;
    const errors: string[] = [];

    try {
      // Log import start
      const { data: importLog } = await supabase
        .from('product_import_logs')
        .insert([{
          staff_id: user?.id,
          total_rows: csvData.length,
          status: 'processing'
        }])
        .select()
        .single();

      for (let i = 0; i < csvData.length; i++) {
        try {
          const row = csvData[i];
          const tagsArray = row.tags ? row.tags.split(',').map(tag => tag.trim()).filter(Boolean) : null;
          const stock = parseInt(row.stock) || 0;

          const productData = {
            name: row.name,
            slug: generateSlug(row.name),
            description: row.description,
            category: row.category,
            brand: row.brand || null,
            tags: tagsArray,
            unit: row.unit,
            price: parseFloat(row.price),
            mrp: row.mrp ? parseFloat(row.mrp) : null,
            weight_volume: row.weight_volume,
            manufacturer: row.manufacturer,
            requires_prescription: row.requires_prescription === 'true',
            stock: stock,
            expiration_date: row.expiration_date || null,
            is_active: row.is_active !== 'false' && stock > 0,
            image_urls: null
          };

          const { error } = await supabase
            .from('products')
            .insert([productData]);

          if (error) {
            throw error;
          }

          successful++;
        } catch (error: any) {
          failed++;
          errors.push(`Row ${i + 1}: ${error.message}`);
        }
      }

      // Update import log
      if (importLog) {
        await supabase
          .from('product_import_logs')
          .update({
            successful_rows: successful,
            failed_rows: failed,
            status: failed === 0 ? 'completed' : 'completed_with_errors',
            error_message: errors.length > 0 ? errors.join('; ') : null
          })
          .eq('id', importLog.id);
      }

      setImportResults({ successful, failed, errors });

      toast({
        title: "Import Completed",
        description: `${successful} products imported successfully${failed > 0 ? `, ${failed} failed` : ''}`,
      });

    } catch (error: any) {
      toast({
        title: "Import Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
    }
  };

  const getRowError = (rowIndex: number) => {
    return validationErrors.filter(error => error.row === rowIndex);
  };

  const getUniqueErrors = () => {
    const uniqueErrors = new Map<string, ValidationError>();
    validationErrors.forEach(error => {
      const key = `${error.field}-${error.message}`;
      if (!uniqueErrors.has(key)) {
        uniqueErrors.set(key, error);
      }
    });
    return Array.from(uniqueErrors.values());
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#0B1F45]">Bulk Import Products (CSV)</h1>
      </div>

      <Card className="rounded-xl shadow-sm">
        <CardHeader>
          <CardTitle>Instructions & Template</CardTitle>
          <p className="text-gray-600">
            Download the CSV template, fill in your product details, then upload below.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={downloadTemplate}
            variant="outline"
            className="text-[#27AE60] border-[#27AE60] hover:bg-[#27AE60] hover:text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Download CSV Template
          </Button>
        </CardContent>
      </Card>

      <Card className="rounded-xl shadow-sm">
        <CardHeader>
          <CardTitle>Upload & Preview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* File Upload */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Drag & drop your CSV file here, or click to browse</p>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
              id="csv-upload"
            />
            <label htmlFor="csv-upload">
              <Button asChild className="cursor-pointer">
                <span>Choose File</span>
              </Button>
            </label>
            
            {/* Show uploaded file name with remove option */}
            {fileName && (
              <div className="mt-4 flex items-center justify-center space-x-2">
                <span className="text-sm text-gray-700">Uploaded: {fileName}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearCSVData}
                  className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                >
                  <X className="w-4 h-4 mr-1" />
                  Remove
                </Button>
              </div>
            )}
          </div>

          {/* Validation Summary */}
          {csvData.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm">
                    {csvData.length - validationErrors.filter(e => requiredFields.includes(e.field)).length} valid rows
                  </span>
                </div>
                {validationErrors.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <XCircle className="w-5 h-5 text-red-600" />
                    <span className="text-sm text-red-600">
                      {validationErrors.length} validation errors
                    </span>
                  </div>
                )}
              </div>

              {/* Detailed Error Messages */}
              {validationErrors.length > 0 && (
                <Card className="bg-red-50 border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-800 text-lg">Validation Errors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {getUniqueErrors().map((error, index) => (
                        <div key={index} className="text-sm text-red-700">
                          <strong>Row {error.row}</strong> - {error.field}: {error.message}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Preview Table */}
          {csvData.length > 0 && (
            <div className="rounded-lg border max-h-96 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Row</TableHead>
                    {csvHeaders.slice(0, 6).map(header => (
                      <TableHead key={header} className="capitalize">
                        {header.replace('_', ' ')}
                      </TableHead>
                    ))}
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {csvData.slice(0, 10).map((row, index) => {
                    const rowErrors = getRowError(index + 1);
                    const hasErrors = rowErrors.length > 0;
                    
                    return (
                      <TableRow key={index} className={hasErrors ? 'bg-red-50' : ''}>
                        <TableCell>{index + 1}</TableCell>
                        {csvHeaders.slice(0, 6).map(header => (
                          <TableCell key={header} className="max-w-32 truncate">
                            {row[header]}
                          </TableCell>
                        ))}
                        <TableCell>
                          {hasErrors ? (
                            <div className="text-red-600 text-xs">
                              {rowErrors.slice(0, 2).map(error => error.message).join(', ')}
                              {rowErrors.length > 2 && '...'}
                            </div>
                          ) : (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Import Button */}
          {csvData.length > 0 && (
            <Button
              onClick={handleImport}
              disabled={validationErrors.length > 0 || isImporting}
              className="w-full bg-[#27AE60] hover:bg-[#219150]"
            >
              {isImporting ? 'Importing Products...' : 'Import Products'}
            </Button>
          )}

          {/* Import Results */}
          {importResults && (
            <Card className="bg-gray-50">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Import Results</h3>
                <div className="space-y-1 text-sm">
                  <p className="text-green-600">✓ {importResults.successful} products imported successfully</p>
                  {importResults.failed > 0 && (
                    <p className="text-red-600">✗ {importResults.failed} rows failed</p>
                  )}
                  {importResults.errors.length > 0 && (
                    <div className="mt-2">
                      <p className="font-medium">Errors:</p>
                      <ul className="list-disc list-inside text-red-600">
                        {importResults.errors.slice(0, 5).map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                        {importResults.errors.length > 5 && (
                          <li>... and {importResults.errors.length - 5} more errors</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BulkImport;
