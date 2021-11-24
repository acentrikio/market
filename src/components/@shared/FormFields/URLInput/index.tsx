import React, { ReactElement } from 'react'
import Button from '@shared/atoms/Button'
import { ErrorMessage, useField } from 'formik'
import Loader from '@shared/atoms/Loader'
import styles from './index.module.css'
import InputGroup from '@shared/FormInput/InputGroup'
import InputElement from '@shared/FormInput/InputElement'

export default function URLInput({
  submitText,
  handleButtonClick,
  isLoading,
  name,
  value,
  isValid,
  ...props
}: {
  submitText: string
  handleButtonClick(e: React.SyntheticEvent, data: string): void
  isLoading: boolean
  name: string
  value: string
  isValid?: boolean
}): ReactElement {
  const [field, meta] = useField(name)
  const isButtonDisabled =
    !field.value || field.value.length === 0 || field.value === ''

  return (
    <>
      <InputGroup>
        <InputElement
          className={`${styles.input} ${
            meta.touched && meta.error ? styles.hasError : ''
          }`}
          {...props}
          name={name}
          value={value}
          type="url"
        />

        {isValid ? (
          <Button size="small" disabled className={styles.success}>
            ✓ Valid
          </Button>
        ) : (
          <Button
            style="primary"
            size="small"
            onClick={(e: React.SyntheticEvent) => {
              e.preventDefault()
              handleButtonClick(e, field.value)
            }}
            disabled={isButtonDisabled}
          >
            {isLoading ? <Loader /> : submitText}
          </Button>
        )}
      </InputGroup>

      {meta.touched && meta.error && (
        <div className={styles.error}>
          <ErrorMessage name={field.name} />
        </div>
      )}
    </>
  )
}