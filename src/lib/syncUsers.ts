// /lib/syncUsers.ts
export function syncRegisteredUsers() {
  if (typeof window === 'undefined') return

  const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
  ;(window as any).registeredUsers = JSON.stringify(users)
}
