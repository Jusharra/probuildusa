import React, { useState, useEffect, useRef } from 'react';
import { Upload, X, Download, Eye, AlertCircle, CheckCircle, Loader2, Trash2 } from 'lucide-react';
import { UploadService } from '../services/uploadService';
import { useAuth } from '../contexts/AuthContext';

interface FileUploadProps {
  relatedTo: string; // e.g., 'lead', 'contractor', 'contract'
  relatedId: string; // The ID of the related entity
  onUploadSuccess?: (upload: any) => void;
  onUploadError?: (error: string) => void;
  maxFiles?: number;
  allowedFileTypes?: string[]; // e.g., ['image/*', 'application/pdf', '.doc', '.docx']
  maxSizeMB?: number;
  className?: string;
  label?: string;
  description?: string;
  bucketName?: string; // The storage bucket to upload to
  fileNameOverride?: string; // Optional override for the filename
}

interface UploadedFile {
  id: string;
  file_url: string;
  file_type: string | null;
  description: string | null;
  created_at: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  relatedTo,
  relatedId,
  onUploadSuccess,
  onUploadError,
  maxFiles = 10,
  allowedFileTypes = ['image/*', 'application/pdf', '.doc', '.docx', '.xls', '.xlsx'],
  maxSizeMB = 10,
  className = '',
  label = 'Upload Files',
  description = 'Drag and drop files here or click to browse',
  bucketName = 'uploads',
  fileNameOverride
}) => {
  const { user } = useAuth();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (relatedId && relatedId !== 'temp') {
      loadExistingFiles();
    }
  }, [relatedTo, relatedId]);

  const loadExistingFiles = async () => {
    try {
      const files = await UploadService.getUploads(relatedTo, relatedId);
      setUploadedFiles(files);
    } catch (error) {
      console.error('Error loading existing files:', error);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = async (files: File[]) => {
    if (!user) {
      onUploadError?.('You must be logged in to upload files');
      return;
    }

    // Check file count limit
    if (uploadedFiles.length + files.length > maxFiles) {
      onUploadError?.(`Maximum ${maxFiles} files allowed`);
      return;
    }

    setUploading(true);
    const newProgress: { [key: string]: number } = {};

    for (const file of files) {
      const fileId = `${file.name}-${Date.now()}`;
      newProgress[fileId] = 0;
      setUploadProgress(prev => ({ ...prev, ...newProgress }));

      try {
        // Validate file
        const validationError = UploadService.validateFile(file, allowedFileTypes, maxSizeMB);
        if (validationError) {
          onUploadError?.(validationError);
          continue;
        }

        // Simulate progress for better UX
        const progressInterval = setInterval(() => {
          setUploadProgress(prev => ({
            ...prev,
            [fileId]: Math.min(prev[fileId] + 10, 90)
          }));
        }, 100);

        // Upload file
        const storagePath = `${relatedTo}/${relatedId}`;
        
        // Log the upload attempt for debugging
        console.log(`Attempting to upload file to bucket: ${bucketName}, path: ${storagePath}`);
        
        const fileUrl = await UploadService.uploadFile(file, storagePath, bucketName, fileNameOverride);

        // Record upload metadata
        const uploadData = {
          uploaded_by: user.id,
          related_to: relatedTo,
          related_id: relatedId,
          file_url: fileUrl,
          file_type: file.type,
          description: file.name
        };

        const upload = await UploadService.recordUpload(uploadData);

        clearInterval(progressInterval);
        setUploadProgress(prev => ({ ...prev, [fileId]: 100 }));

        // Add to uploaded files list
        setUploadedFiles(prev => [upload, ...prev]);
        onUploadSuccess?.(upload);

        // Clean up progress after a delay
        setTimeout(() => {
          setUploadProgress(prev => {
            const newProgress = { ...prev };
            delete newProgress[fileId];
            return newProgress;
          });
        }, 1000);

      } catch (error: any) {
        console.error('Upload error:', error);
        onUploadError?.(error.message || 'Failed to upload file');
        
        // Clean up progress
        setUploadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[fileId];
          return newProgress;
        });
      }
    }

    setUploading(false);
    
    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDeleteFile = async (uploadId: string) => {
    if (!confirm('Are you sure you want to delete this file?')) {
      return;
    }

    try {
      await UploadService.deleteUpload(uploadId);
      setUploadedFiles(prev => prev.filter(file => file.id !== uploadId));
    } catch (error: any) {
      console.error('Delete error:', error);
      onUploadError?.(error.message || 'Failed to delete file');
    }
  };

  const handleDownloadFile = (fileUrl: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getFileName = (fileUrl: string, description: string | null) => {
    return description || fileUrl.split('/').pop() || 'Unknown file';
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
          dragActive
            ? 'border-amber-400 bg-amber-400/10'
            : uploading
            ? 'border-blue-400 bg-blue-400/10'
            : 'border-slate-600 hover:border-amber-400 hover:bg-amber-400/5'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={allowedFileTypes.join(',')}
          onChange={handleFileInput}
          className="hidden"
          disabled={uploading}
        />

        <div className="flex flex-col items-center space-y-4">
          {uploading ? (
            <Loader2 className="w-12 h-12 text-blue-400 animate-spin" />
          ) : (
            <Upload className="w-12 h-12 text-slate-400" />
          )}
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">{label}</h3>
            <p className="text-slate-400 mb-2">{description}</p>
            <p className="text-sm text-slate-500">
              Max {maxFiles} files, {maxSizeMB}MB each
            </p>
            {allowedFileTypes.length > 0 && (
              <p className="text-xs text-slate-500 mt-1">
                Allowed: {allowedFileTypes.join(', ')}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Upload Progress */}
      {Object.keys(uploadProgress).length > 0 && (
        <div className="space-y-3">
          {Object.entries(uploadProgress).map(([fileId, progress]) => (
            <div key={fileId} className="bg-slate-700 rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm text-slate-300">{fileId.split('-')[0]}</div>
                <div className="text-xs text-slate-400">{progress}%</div>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-1.5">
                <div
                  className="bg-amber-400 h-1.5 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold text-slate-300">Uploaded Files</h4>
          <div className="space-y-2">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="bg-slate-700 rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">
                    {UploadService.getFileTypeIcon(file.file_url)}
                  </div>
                  <div>
                    <div className="text-sm text-white font-medium">
                      {getFileName(file.file_url, file.description)}
                    </div>
                    <div className="text-xs text-slate-400">
                      {file.file_type} • {new Date(file.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => window.open(file.file_url, '_blank')}
                    className="p-1.5 text-slate-400 hover:text-blue-400 transition-colors"
                    title="View File"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDownloadFile(file.file_url, getFileName(file.file_url, file.description))}
                    className="p-1.5 text-slate-400 hover:text-green-400 transition-colors"
                    title="Download File"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteFile(file.id)}
                    className="p-1.5 text-slate-400 hover:text-red-400 transition-colors"
                    title="Delete File"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;