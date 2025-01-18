import { Rule as ValidationRule } from '@sanity/types';

export default {
  name: 'products',
  title: 'Products',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: ValidationRule) =>
        Rule.required().min(3).max(50).error('Name must be between 3 and 50 characters.'),
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule: ValidationRule) =>
        Rule.required().positive().min(1).error('Price must be a positive number greater than 0.'),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: ValidationRule) =>
        Rule.required()
          .min(10)
          .max(1000)
          .error('Description must be between 10 and 1000 characters.'),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: (Rule: ValidationRule) =>
        Rule.required().error('An image is required for the product.'),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'T-Shirt', value: 'tshirt' },
          { title: 'Short', value: 'short' },
          { title: 'Jeans', value: 'jeans' },
          { title: 'Hoodie', value: 'hoodie' },
          { title: 'Shirt', value: 'shirt' },
        ],
      },
      validation: (Rule: ValidationRule) =>
        Rule.required().error('Please select a category for the product.'),
    },
    {
      name: 'discountPercent',
      title: 'Discount Percent',
      type: 'number',
      validation: (Rule: ValidationRule) =>
        Rule.min(0).max(100).error('Discount Percent must be between 0 and 100.'),
    },
    {
      name: 'new',
      title: '  New',
      type: 'boolean',
      validation: (Rule: ValidationRule) =>
        Rule.required().error('Please specify whether the product is new.'),
    },
    {
      name: 'colors',
      title: 'Colors',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule: ValidationRule) =>
        Rule.required()
          .min(1)
          .error('At least one color must be specified for the product.'),
    },
    {
      name: 'sizes',
      title: 'Sizes',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule: ValidationRule) =>
        Rule.required()
          .min(1)
          .error('At least one size must be specified for the product.'),
    },
    {
        name: 'isNew',
        title: 'Is New',
        type: 'boolean',
        validation: (Rule: ValidationRule) =>
          Rule.required().error('Please specify whether the product is new.'),
      },
  ],
};
