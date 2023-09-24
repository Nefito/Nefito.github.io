import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { BookComponent } from "./book-component";

test("renders book information", () => {
  const mockProps = {
    title: "Test Title",
    coverURL: "http://example.com/cover.jpg",
    authors: ["Author One", "Author Two"],
    description: "Test Description",
    publishDate: "2023-09-22",
  };

  const { getByText, getByAltText } = render(<BookComponent {...mockProps} />);

  // Check if title, authors, description, and publish date are rendered
  expect(getByText("Title:")).toBeInTheDocument();
  expect(getByText("Test Title")).toBeInTheDocument();
  expect(getByText("Author(s): Author One, Author Two")).toBeInTheDocument();
  expect(getByText("Description: Test Description")).toBeInTheDocument();
  expect(getByText("Publish date: Fri Sep 22 2023")).toBeInTheDocument();

  // Check if cover image is rendered with correct alt text
  const image = getByAltText("Test Title");
  expect(image).toBeInTheDocument();
  expect(image).toHaveAttribute("src", "http://example.com/cover.jpg");
});

test("handles missing optional props", () => {
  const mockProps = {
    title: "Test Title",
    coverURL: "http://example.com/cover.jpg",
    authors: ["Author One", "Author Two"],
    // Missing description and publishDate
  };

  const { queryByText } = render(<BookComponent {...mockProps} />);

  // Check if 'No date available' is rendered when publishDate is missing
  expect(queryByText("Publish date: No date available")).toBeInTheDocument();

  // Check if description is not rendered when it is missing
  expect(queryByText("Description:")).not.toBeInTheDocument();
});
