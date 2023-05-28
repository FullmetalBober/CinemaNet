import { useCallback, useRef, useState } from 'react';

interface Props {
  id: string;
  preview: string;
  width?: number;
  height?: number;
  rounded?: 'rounded' | 'rounded-full';
  onInput: (id: string, value: File | null, isValid: boolean) => void;
  initialValid?: boolean;
}

const ImageUpload = (props: Props) => {
  const [previewUrl, setPreviewUrl] = useState<string>(props.preview);

  const filePickerRef = useRef<HTMLInputElement>(null);

  const pickedHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let file: File | null = null;
      let isValid: boolean = false;
      if (event.target.files && event.target.files.length === 1) {
        file = event.target.files[0];
        setPreviewUrl(URL.createObjectURL(file));
        isValid = true;
      }

      props.onInput(props.id, file, isValid);
    },
    [props.id, props.onInput]
  );

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
        width={props.width}
        style={{ height: props.height || props.width }}
        onClick={() => filePickerRef.current!.click()}
        className={`cursor-pointer object-cover object-center ${props.rounded}`}
      />
    </div>
  );
};

export default ImageUpload;
