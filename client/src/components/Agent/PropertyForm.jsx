import { useFormik } from 'formik'
import * as Yup from 'yup'

export default function PropertyForm({ onSuccess }) {
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: '',
      location: '',
      type: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().min(5).required('Required'),
      description: Yup.string().min(20).required('Required'),
      price: Yup.number().positive().required('Required'),
      location: Yup.string().required('Required'),
      type: Yup.string().oneOf(['apartment', 'house', 'condo']).required('Required'),
    }),
    onSubmit: (values, { resetForm }) => {
      fetch('/agent/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.token}`,
        },
        body: JSON.stringify(values),
      })
        .then((r) => r.json())
        .then((newListing) => {
          onSuccess(newListing)
          resetForm()
        })
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      {['title', 'description', 'price', 'location'].map((field) => (
        <div key={field}>
          <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
          <input
            type={field === 'price' ? 'number' : 'text'}
            name={field}
            value={formik.values[field]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="input"
          />
          {formik.touched[field] && formik.errors[field] && (
            <div className="text-red-600 text-sm">{formik.errors[field]}</div>
          )}
        </div>
      ))}

      <div>
        <label>Type</label>
        <select
          name="type"
          value={formik.values.type}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="input"
        >
          <option value="">Select Type</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="condo">Condo</option>
        </select>
        {formik.touched.type && formik.errors.type && (
          <div className="text-red-600 text-sm">{formik.errors.type}</div>
        )}
      </div>

      <button type="submit" className="btn btn-primary">Submit Property</button>
    </form>
  )
}