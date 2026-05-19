import { PROJECT_NAME } from '../lib/config'
import { faviconImages } from '../lib/images'

export default function manifest() {
  return {
    name: PROJECT_NAME,
    short_name: 'Godrej Crown',
    icons: faviconImages.android,
    theme_color: '#ffffff',
    background_color: '#ffffff',
    display: 'standalone',
  }
}
