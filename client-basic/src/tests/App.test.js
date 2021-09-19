import React from "react";
import axios from 'axios';
var MockAdapter = require("axios-mock-adapter");
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { AuthProvider } from "../contexts/AuthContext";
const pikachu = require('../data/user-pikachu.json');
const superAdmin = require('../data/user-superadmin.json');
import products from '../data/products.json';
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

describe('App when user is not logged in', () => {
  test('renders Feature flag header', () => {
    act(() => {
      render(<AuthProvider>
        <App />
      </AuthProvider>);

      const linkElement = findAndAssertElement('Feature flag', 'H1');
      expect(linkElement).toHaveClass('header');
    });
  });

  test('renders Log in button if not logged in', () => {
    act(() => {
      render(<AuthProvider>
        <App />
      </AuthProvider>);
      findAndAssertElement('Log in', 'SPAN');
    });
  });
});

describe('App when user Pikachu is logged in', () => {

  let container;
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: setupFakeLocalStorage(JSON.stringify(pikachu)),
    });

    mock.onPost("http://localhost:5000/api/products/search").reply(function (config) {
      console.log(config.url);
      return [200, products];
    });

    mock.onPost("http://localhost:5000/api/filters/search").reply(function (config) {
      console.log(config.url);
      return [200, filters];
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
    cleanup();
  });

  test('renders User name and Log out button if already logged in', () => {
    act(() => {
      render(<AuthProvider>
        <App />
      </AuthProvider>, container);
      findAndAssertElement('Log out', 'SPAN');
      const userNameElement = findAndAssertElement('Pikachu', 'H2');
      expect(userNameElement).toHaveClass('header');
    });
  });

  test('renders Dashboard Product and Customer menu items if already logged in', () => {
    act(() => {
      render(<AuthProvider>
        <App />
      </AuthProvider>, container);

      findAndAssertElement('Dashboard', 'A');
      findAndAssertElement('Product', 'SPAN');
      findAndAssertElement('Customer', 'SPAN');
    });
  });

  test('renders Product sub menus if user Pikachu is logged in and clicks Product menu', () => {
    render(<AuthProvider>
      <App />
    </AuthProvider>, container);
    const productElement = findAndAssertElement('Product', 'SPAN');
    act(() => {
      productElement.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    findAndAssertElement('Add Product', 'A');
    findAndAssertElement('Product List', 'A');
  });

  test('renders Product List page if user Pikachu is logged in and clicks Product list menu', async () => {
    render(<AuthProvider>
      <App />
    </AuthProvider>, container);
    const productElement = findAndAssertElement('Product', 'SPAN');
    act(() => {
      productElement.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const productListElement = findAndAssertElement('Product List', 'A');
    act(() => {
      productListElement.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const sku = await waitFor(() => { return screen.getByText('SKU'); });    
    assertElement(sku, 'TH');
    const productName = await waitFor(() => { return screen.getByText('Black Berry'); });
    assertElement(productName, 'A');
  });

  test('does not render user menu if user Pikachu is logged in', () => {
    render(<AuthProvider>
      <App />
    </AuthProvider>, container);
    const linkElement = screen.queryByText('User');
    expect(linkElement).toBeNull();
  });
});
