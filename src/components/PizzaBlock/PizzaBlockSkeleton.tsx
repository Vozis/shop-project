import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = (props: any) => (
  <ContentLoader
    className={"pizza-block"}
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="140" cy="120" r="120" />
    <rect x="114" y="336" rx="0" ry="0" width="5" height="2" />
    <rect x="163" y="392" rx="0" ry="0" width="1" height="0" />
    <rect x="109" y="310" rx="0" ry="0" width="2" height="0" />
    <rect x="0" y="280" rx="10" ry="10" width="280" height="40" />
    <rect x="2" y="330" rx="10" ry="10" width="280" height="70" />
    <rect x="1" y="419" rx="10" ry="10" width="100" height="30" />
    <rect x="53" y="455" rx="0" ry="0" width="3" height="4" />
    <rect x="120" y="411" rx="23" ry="23" width="160" height="46" />
    <rect x="240" y="452" rx="0" ry="0" width="0" height="0" />
  </ContentLoader>
);

export default MyLoader;
