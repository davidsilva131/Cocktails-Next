export const fileUpload = async (file) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME
  const uploadPreset = 'Cocktails'

  const urlCloudinary = process.env.NEXT_PUBLIC_CLOUD_URL
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', uploadPreset)
  formData.append('cloud_name', cloudName)

  try {
    const resp = await fetch(urlCloudinary, {
      method: 'post',
      body: formData
    })
    if (!resp.ok) return null
    const data = await resp.json()
    return data.secure_url
  } catch (error) {
    console.log(error)
  }
}
