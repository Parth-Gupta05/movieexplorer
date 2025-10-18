'use client'
import { useEffect } from 'react'
import { syncRegisteredUsers } from '@/lib/syncUsers'

export default function SyncClient() {
  useEffect(() => {
    syncRegisteredUsers()
  }, [])

  return null
}
