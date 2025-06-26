import * as Yup from 'yup'

export const propertySchema = Yup.object({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be 100 characters or less')
    .required('Title is required'),

  location: Yup.string()
    .required('Location is required'),

  type: Yup.string()
    .oneOf(['apartment', 'house', 'condo'])
    .required('Property type is required'),

  price: Yup.number()
    .typeError('Price must be a number')
    .positive('Price must be a positive number')
    .required('Price is required'),

  status: Yup.string()
    .oneOf(['available', 'under offer', 'sold', 'rented'])
    .required('Status is required')
})
