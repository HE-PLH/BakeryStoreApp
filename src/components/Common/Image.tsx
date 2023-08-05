// import { ImageLoader } from "react-native-image-fallback";
import { ICON_URL, IMG_URL } from "../../constants/Network";
import {Image} from "react-native";

interface ImageProps {
  og: boolean;
  url: string;
  dimension: number;
}

const MyImage = (props: ImageProps): JSX.Element => {
  return (
    <Image
      src={(props.og ? `${IMG_URL}` : "") + `${props.url}.jpg`}
      style={{
        height: props.dimension || 80,
        width: props.dimension || 80,
        borderRadius: 10,
      }}
    />
  );
};

export default MyImage;
