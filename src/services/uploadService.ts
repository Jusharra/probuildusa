import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Upload = Database['public']['Tables']['uploads']['Row'];
type UploadInsert = Database['public']['Tables']['uploads']['Insert'];

export class UploadService {
  // Upload file to Supabase Storage
  static async uploadFile(
    file: File, 
    path: string, 
    bucket: string = 'uploads', 
    fileNameOverride?: string
  ): Promise<string> {
    try {
      console.log('📤 [UploadService] Uploading file:', {
        name: file.name,
        size: file.size,
        type: file.type,
        path,
        bucket,
        fileNameOverride
      });

      // Generate unique filename to avoid conflicts, or use override if provided
      const fileExt = file.name.split('.').pop();
      const fileName = fileNameOverride || 
        `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${path}/${fileName}`;

      // Check if bucket exists
      const { data: buckets } = await supabase.storage.listBuckets();
      const bucketExists = buckets?.some(b => b.name === bucket);
      
      if (!bucketExists) {
        console.error(`❌ [UploadService] Bucket "${bucket}" does not exist`);
        throw new Error(`Bucket "${bucket}" not found. Please contact the administrator.`);
      }

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('❌ [UploadService] Upload error:', error);
        throw error;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      console.log('✅ [UploadService] File uploaded successfully:', publicUrl);
      return publicUrl;
    } catch (error) {
      console.error('💥 [UploadService] Failed to upload file:', error);
      throw error;
    }
  }

  // Delete file from Supabase Storage
  static async deleteFile(filePath: string, bucket: string = 'uploads'): Promise<void> {
    try {
      console.log('🗑️ [UploadService] Deleting file:', filePath, 'from bucket:', bucket);

      // Extract the path from the full URL if needed
      const pathOnly = filePath.includes('/storage/v1/object/public/') 
        ? filePath.split(`/storage/v1/object/public/${bucket}/`)[1]
        : filePath;

      const { error } = await supabase.storage
        .from(bucket)
        .remove([pathOnly]);

      if (error) {
        console.error('❌ [UploadService] Delete error:', error);
        throw error;
      }

      console.log('✅ [UploadService] File deleted successfully');
    } catch (error) {
      console.error('💥 [UploadService] Failed to delete file:', error);
      throw error;
    }
  }

  // Record upload metadata in database
  static async recordUpload(uploadData: UploadInsert): Promise<Upload> {
    try {
      console.log('📝 [UploadService] Recording upload metadata:', uploadData);

      const { data, error } = await supabase
        .from('uploads')
        .insert(uploadData)
        .select()
        .single();

      if (error) {
        console.error('❌ [UploadService] Error recording upload:', error);
        throw error;
      }

      console.log('✅ [UploadService] Upload metadata recorded successfully');
      return data;
    } catch (error) {
      console.error('💥 [UploadService] Failed to record upload metadata:', error);
      throw error;
    }
  }

  // Get uploads for a specific entity
  static async getUploads(relatedTo: string, relatedId: string): Promise<Upload[]> {
    try {
      console.log('🔍 [UploadService] Getting uploads for:', { relatedTo, relatedId });

      const { data, error } = await supabase
        .from('uploads')
        .select('*')
        .eq('related_to', relatedTo)
        .eq('related_id', relatedId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ [UploadService] Error getting uploads:', error);
        throw error;
      }

      console.log('✅ [UploadService] Retrieved uploads:', data?.length || 0);
      return data || [];
    } catch (error) {
      console.error('💥 [UploadService] Failed to get uploads:', error);
      throw error;
    }
  }

  // Delete upload record and file
  static async deleteUpload(uploadId: string): Promise<void> {
    try {
      console.log('🗑️ [UploadService] Deleting upload:', uploadId);

      // First get the upload record to get the file URL
      const { data: upload, error: getError } = await supabase
        .from('uploads')
        .select('file_url')
        .eq('id', uploadId)
        .single();

      if (getError) {
        console.error('❌ [UploadService] Error getting upload record:', getError);
        throw getError;
      }

      // Delete the file from storage
      if (upload?.file_url) {
        await this.deleteFile(upload.file_url);
      }

      // Delete the database record
      const { error: deleteError } = await supabase
        .from('uploads')
        .delete()
        .eq('id', uploadId);

      if (deleteError) {
        console.error('❌ [UploadService] Error deleting upload record:', deleteError);
        throw deleteError;
      }

      console.log('✅ [UploadService] Upload deleted successfully');
    } catch (error) {
      console.error('💥 [UploadService] Failed to delete upload:', error);
      throw error;
    }
  }

  // Validate file type and size
  static validateFile(file: File, allowedTypes: string[] = [], maxSizeMB: number = 10): string | null {
    // Check file size
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return `File size must be less than ${maxSizeMB}MB`;
    }

    // Check file type if specified
    if (allowedTypes.length > 0) {
      const fileType = file.type.toLowerCase();
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      
      const isValidType = allowedTypes.some(type => {
        if (type.includes('/')) {
          // MIME type check
          return fileType === type || fileType.startsWith(type.replace('*', ''));
        } else {
          // Extension check
          return fileExt === type.replace('.', '');
        }
      });

      if (!isValidType) {
        return `File type not allowed. Allowed types: ${allowedTypes.join(', ')}`;
      }
    }

    return null; // File is valid
  }

  // Get file type icon
  static getFileTypeIcon(fileName: string): string {
    const ext = fileName.split('.').pop()?.toLowerCase();
    
    switch (ext) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      case 'xls':
      case 'xlsx':
        return '📊';
      case 'ppt':
      case 'pptx':
        return '📋';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'webp':
        return '🖼️';
      case 'mp4':
      case 'mov':
      case 'avi':
        return '🎥';
      case 'mp3':
      case 'wav':
        return '🎵';
      case 'zip':
      case 'rar':
      case '7z':
        return '📦';
      default:
        return '📎';
    }
  }

  // Format file size
  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}