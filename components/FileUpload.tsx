'use client';
import React, { useRef, useState } from 'react';
import { IKImage, ImageKitProvider, IKUpload, IKVideo } from 'imagekitio-next';
import config from '@/lib/config';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticater = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }
    const { signature, expire, token } = await response.json();
    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Authenticater error: ${error}`);
  }
};

interface Props {
  type: 'image' | 'video';
  accept: string;
  placeholder: string;
  folder: string;
  variant: 'light' | 'dark';
  value?: string;
  onFileChange: (filePath: string) => void;
}

const FileUpload = ({
  onFileChange,
  type,
  accept,
  placeholder,
  folder,
  variant,
  value,
}: Props) => {
  const { toast } = useToast();

  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string | null }>({
    filePath: value ?? null,
  });
  const [progress, setProgress] = useState(0);

  const styles = {
    button:
      variant === 'dark'
        ? 'bg-dark-300'
        : 'bg-light-600 border-gray-100 border',
    placeholder: variant === 'dark' ? 'text-light-100' : 'text-slate-500',
    text: variant === 'dark' ? 'text-light-100' : 'text-dark-400',
  };

  const onError = (error: any) => {
    console.error(error);
    toast({
      title: `${type} Uploaded Failed`,
      description: `Your ${type} couldn't be uploaded, please try again later`,
      variant: 'destructive',
    });
  };
  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);
    toast({
      title: `${type} Uploaded Successfully'`,
      description: `${res.filePath} uploaded`,
    });
  };

  const onValidate = (file: File) => {
    if (type === 'image') {
      if (file.size > 1024 * 1024 * 20) {
        toast({
          title: 'File size is too large',
          description: 'Please upload a file less than 20MB',
          variant: 'destructive',
        });
        return false;
      }
    } else if (type === 'video') {
      if (file.size > 1024 * 1024 * 50) {
        toast({
          title: 'File size is too large',
          description: 'Please upload a file less than 500MB',
          variant: 'destructive',
        });
        return false;
      }
    }
    return true;
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticater}
    >
      <IKUpload
        className='hidden'
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName={true}
        validateFile={onValidate}
        onUploadStart={() => setProgress(0)}
        onUploadProgress={({ loaded, total }) => {
          const percent = Math.round((loaded / total) * 100);
          setProgress(percent);
        }}
        folder={folder}
        accept={accept}
      />

      <button
        className={cn('upload-btn', styles.button)}
        onClick={(e) => {
          e.preventDefault();
          if (ikUploadRef.current) {
            // @ts-ignore
            ikUploadRef?.current?.click();
          }
        }}
      >
        <Image
          src='/icons/upload.svg'
          alt='upload-icom'
          width={20}
          height={20}
          className='object-contain'
        />

        <p className={cn('text-base', styles.placeholder)}>{placeholder}</p>

        {file && (
          <p className={cn('upload-filename', styles.text)}>{file.filePath}</p>
        )}

        {/* {file && <p className='upload-filename'>{file.filePath}</p>} */}

        {progress > 0 && progress !== 100 && (
          <div className='progress' style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        )}
      </button>
      {file &&
        (type === 'image' ? (
          <IKImage
            alt={file.filePath || 'uploaded file'}
            path={file.filePath || undefined}
            width={500}
            height={300}
          />
        ) : type === 'video' ? (
          <IKVideo
            className='h-96 w-full rounded-xl'
            controls={true}
            path={file.filePath || undefined}
          />
        ) : null)}
    </ImageKitProvider>
  );
};

export default FileUpload;
