import { useRef, useState } from 'react';

interface Props {
  id: string;
  preview: string;
  size?: number;
  rounded?: 'rounded' | 'rounded-full';
  onInput: (id: string, value: File, isValid: boolean) => void;
  initialValid?: boolean;
}

const ImageUpload = (props: Props) => {
  const [file, setFile] = useState<File>(null!);
  const [previewUrl, setPreviewUrl] = useState<string>(props.preview);
  const [isValid, setIsValid] = useState<boolean>(props.initialValid || false);

  const filePickerRef = useRef<HTMLInputElement>(null);

  const pickedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length === 1) {
      setFile(event.target.files[0]);
      setPreviewUrl(URL.createObjectURL(event.target.files[0]));
      setIsValid(true);
    } else {
      setIsValid(false);
    }

    props.onInput(props.id, file, isValid);
  };

  return (
    <div>
      <input
        type='file'
        id={props.id}
        ref={filePickerRef}
        style={{ display: 'none' }}
        accept='.jpg,.png,.jpeg'
        onChange={pickedHandler}
      />
      <img
        src={previewUrl}
        alt='Upload image'
        width={props.size}
        style={{ height: props.size }}
        onClick={() => filePickerRef.current!.click()}
        className={`cursor-pointer object-cover object-center ${props.rounded}`}
      />
    </div>
  );
};

export default ImageUpload;
