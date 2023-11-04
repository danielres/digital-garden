import type { Content } from '../appContext'

export default {
  content: (values: Partial<Content>) => {
    const { text, label, slug, url } = values
    if ((label ?? '').length < 3) return false
    if ((slug ?? '').length < 3) return false
    if ((text ?? '').length < 3) return false
    if ((url ?? '').length < 3) return false
    return true
  },
}
