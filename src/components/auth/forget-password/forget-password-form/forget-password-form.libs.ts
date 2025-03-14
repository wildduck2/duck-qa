import axios from 'axios'
import { libsHandler } from '~/utils/libs-handler'
import { SubmitForgetPasswordFormParam } from './forget-password-form.types'

export async function submitForgetPasswordForm({
  formData,
}: SubmitForgetPasswordFormParam) {
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
