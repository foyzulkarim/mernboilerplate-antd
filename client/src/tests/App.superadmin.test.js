import React from "react";
import axios from 'axios';
var MockAdapter = require("axios-mock-adapter");
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { AuthProvider } from "../contexts/AuthContext";
const superAdmin = require('../data/user-superadmin.json');
import roles from '../data/roles.json';
import filters from '../data/filters.json';

// jest.mock('axios');
var mock = new MockAdapter(axios);


const setupFakeLocalStorage = (profile) => {
  const fakeLocalStorage = (function () {
    let store = {
      profile: profile // JSON.stringify(user)
    };

    return {
      getItem: function (key) {
        return store[key] || null;
      },
      setItem: function (key, value) {
        store[key] = value.toString();
      }
    };
  })(profile);
  return fakeLocalStorage;
}

function findAndAssertElement(text, tag) {
  const linkElement = screen.getByText(text);
  return assertElement(linkElement, tag);
}

function assertElement(linkElement, tag) {
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toBeVisible();
  expect(linkElement.tagName).toBe(tag);
  return linkElement;
}

describe('App when user Superadmin is logged in', () => {

  let container;
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: setupFakeLocalStorage(JSON.stringify(superAdmin)),
    });
     
    mock.onPost("http://localhost:5000/api/roles/search").reply(function (config) {
      console.log(config.url);
      return [200, roles];
    });
  });

  afterAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: null,
    });
  });

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  test('renders User name and Log out button if already logged in', () => {
    act(() => {
      render(<AuthProvider>
        <App />
      </AuthProvider>, container);
      findAndAssertElement('Log out', 'SPAN');
      const userNameElement = findAndAssertElement('Superman', 'H2');
      expect(userNameElement).toHaveClass('header');
    });
  });

  test('renders Dashboard Role User Resource and Permission menu items if already logged in', () => {
    act(() => {
      render(<AuthProvider>
        <App />
      </AuthProvider>, container);

      findAndAssertElement('Dashboard', 'A');
      findAndAssertElement('Role', 'SPAN');
      findAndAssertElement('User', 'SPAN');
      findAndAssertElement('Resource', 'SPAN');
      findAndAssertElement('Permission', 'SPAN');
    });
  });

  test('renders Permission sub menus if user Superman is logged in and clicks Permission menu', () => {
    render(<AuthProvider>
      <App />
    </AuthProvider>, container);
    const element = findAndAssertElement('Permission', 'SPAN');
    act(() => {
      element.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    findAndAssertElement('Add Permission', 'A');
    findAndAssertElement('Permission List', 'A');
  });

  test('renders Role List page if user Superman is logged in and clicks Role List menu', async () => {
    render(<AuthProvider>
      <App />
    </AuthProvider>, container);
    const element = findAndAssertElement('Role', 'SPAN');
    act(() => {
      element.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const listElement = findAndAssertElement('Role List', 'A');
    act(() => {
      listElement.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    const roleElement = await waitFor(() => { return screen.getByText('Super shop admin'); });    
    assertElement(roleElement, 'A');    
  });

  test('does not render Product menu if user Superman is logged in', () => {
    render(<AuthProvider>
      <App />
    </AuthProvider>, container);
    const linkElement = screen.queryByText('Product');
    expect(linkElement).toBeNull();
  });
});


