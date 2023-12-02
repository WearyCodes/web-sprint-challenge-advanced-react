// Write your tests here
import React from "react"
import AppClass from "./AppClass"
import { render, screen } from "@testing-library/react"
test('The page renders', () => {
  render(<AppClass />)
  const SubmitButton = screen.getByRole('button')
  expect(SubmitButton).toBeVisible()
})
