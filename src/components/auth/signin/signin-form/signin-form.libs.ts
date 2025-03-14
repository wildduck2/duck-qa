import { libsHandler } from '~/utils/libs-handler'
import axios from 'axios'
import { SubmitSignupFormProps } from './signin-form.types'

export async function submitSigninForm({ formData }: SubmitSignupFormProps) {
  try {
    const { data } = await axios.get('https://example.com', {
      //NOTE: some content should go here.
    })

    if (!data) {
      libsHandler('NOTE: SOME ERROR MESSAGE', true)
    }

    libsHandler('NOTE: SOME SUCCESS MESSAGE', true)
  } catch (_) {
    libsHandler(_, true)
  }
}

export async function submitGihubSingin() {
  try {
    const { data } = await axios.get('https://example.com', {
      //NOTE: some content should go here.
    })

    if (!data) {
      libsHandler('NOTE: SOME ERROR MESSAGE', true)
    }

    libsHandler('NOTE: SOME SUCCESS MESSAGE', true)
  } catch (_) {
    libsHandler(_, true)
  }
}
