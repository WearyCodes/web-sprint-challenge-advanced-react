// Write your tests here
import React from "react"
import AppClass from "./AppClass"
import {waitFor, render, screen, fireEvent } from "@testing-library/react"

test('see coords?', () => {
    const wrapper = render(
    <AppClass />
    )
    let coords = document.querySelector('#coordinates')
  expect(coords).toBeTruthy()
})
test('Click submit with no email and error pops up', () => {
  const wrapper = render(
    <AppClass />
  )
  const submitButton = document.querySelector('#submit')
  fireEvent.click(submitButton)
  const error = document.querySelector('#message')
  expect(error).toBeTruthy()
})
test('submit with valid email returns win', () => {
  const wrapper = render(
    <AppClass />
  )
const emailInput = document.querySelector('#email')
  fireEvent.change(email, { target: { value: 'lady@gaga.com' } })
  const submitButton = document.querySelector('#submit')
  fireEvent.click(submitButton)
  const success = document.querySelector('#message')
  expect(success).toBeTruthy()
})
test('Go right message works', () => {
  const wrapper = render(
    <AppClass />
  )
  let up = document.querySelector('#up')
  let right = document.querySelector('#right')
  let message = document.querySelector('#message')
fireEvent.click(up)
fireEvent.click(right)
fireEvent.click(right)
expect(message.textContent).toBe("You can't go right")
})
test('Go right message works', () => {
  const wrapper = render(
    <AppClass />
  )
  let up = document.querySelector('#up')
  let right = document.querySelector('#right')
  let message = document.querySelector('#message')
  let reset = document.querySelector('#reset')
fireEvent.click(up)
fireEvent.click(right)
fireEvent.click(right)
fireEvent.click(reset)
expect(message.textContent).toBeFalsy()
})