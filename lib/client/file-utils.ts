
// lib/file-utils.ts

export function getFileType(url: string, fileName?: string) {
  const target = fileName ?? url

  const ext = target.split('.').pop()?.toLowerCase()

  if (!ext) return 'unknown'

  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext))
    return 'image'

  if (ext === 'pdf')
    return 'pdf'

  if (['doc', 'docx'].includes(ext))
    return 'word'

  if (['ppt', 'pptx'].includes(ext))
    return 'powerpoint'

  if (['xls', 'xlsx'].includes(ext))
    return 'excel'

  if (['txt', 'md'].includes(ext))
    return 'text'

  return 'unknown'
}