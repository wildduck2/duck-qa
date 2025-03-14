import { toast } from 'sonner'

export function libsHandler(_msg: unknown, _err: boolean) {
  if (_err) {
    toast.error(`${_msg}`, {
      id: 'error',
    })
    console.log('BTW<_msg>', _msg)
  } else {
    toast.success(`${_msg}`, {
      id: 'success',
    })
  }
}
