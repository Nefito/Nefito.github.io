import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BookElement } from "./book-element";

describe("BookElement", () => {
  const mockOnClick = jest.fn();
  const props = {
    id: "1",
    title: "Test Title",
    coverURL: "http://example.com/cover.jpg",
    onClick: mockOnClick,
  };

  it("renders book cover and title", () => {
    const { getByAltText, getByText } = render(<BookElement {...props} />);
    expect(getByAltText("Test Title")).toBeInTheDocument();
    expect(getByText("Test Title")).toBeInTheDocument();
    expect(getByAltText("Test Title")).toHaveAttribute(
      "src",
      "http://example.com/cover.jpg"
    );
  });

  it("triggers onClick handler with book id when clicked", () => {
    const { container } = render(<BookElement {...props} />);
    if (container.firstChild) {
      fireEvent.click(container.firstChild);
      expect(mockOnClick).toHaveBeenCalledWith("1");
    }
  });
});
