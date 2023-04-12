import React from "react";
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import { PaletteTree } from "./palette";
import Cart from '../pages/Cart';

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree />}>
      <ComponentPreview path="/Cart">
        <Cart />
      </ComponentPreview>
      <ComponentPreview path="/Cart">
        <Cart />
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;
