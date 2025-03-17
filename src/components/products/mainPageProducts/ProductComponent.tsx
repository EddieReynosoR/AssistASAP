"use client";
import ProductButton from "./ProductButton";
import { useState } from "react";
import Product from "./producto";

export default function TestProduct() {
  const [open, setOpen] = useState(false);

  function closeHandler() {
    setOpen(false);
  }

  function openHandler() {
    setOpen(true);
  }
  return (
    <>
      <ProductButton onOpen={openHandler} />
      <Product
        open={open}
        setOpen={openHandler}
        setClose={closeHandler}
        onClickClose={closeHandler}
      />
    </>
  );
}
