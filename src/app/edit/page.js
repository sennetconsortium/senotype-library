'use client'
import SiderLayout from '@/components/layout/SiderLayout'
import Senotype from '@/components/Senotype/Senotype'
import { EditProvider } from '@/context/EditContext'


function page() {
  return (
    <EditProvider>
      <SiderLayout>
        <Senotype />
      </SiderLayout>
    </EditProvider>
  )
}

export default page