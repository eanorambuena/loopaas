'use client'

export const getUserInfoByIdClient = async (userInfoId: string) => {
  try {
    const response = await fetch(`/api/user-info?id=${userInfoId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      throw new Error(`Error fetching user info: ${response.statusText}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error in getUserInfoByIdClient:', error)
    return null
  }
}
