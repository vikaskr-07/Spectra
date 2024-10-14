'use client'

import { toast } from 'sonner'
import { useState, useTransition, useRef, ElementRef } from 'react'
import { AlertTriangle } from 'lucide-react'
import { IngressInput } from 'livekit-server-sdk'
import { createIngress } from '@/actions/ingress'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

// Defining RTMP and WHIP types
const RTMP = IngressInput.RTMP_INPUT
const WHIP = IngressInput.WHIP_INPUT
type IngressType = IngressInput

export function ConnectModal() {
	const closeRef = useRef<ElementRef<'button'>>(null)
	const [isPending, startTransition] = useTransition()
	const [ingressType, setIngressType] = useState<IngressType>(RTMP) // Defaulting to RTMP

	// Handle form submission
	function onSubmit() {
		startTransition(() => {
			createIngress(ingressType) // Pass the correct IngressInput type (RTMP or WHIP)
				.then((url) => {
					toast.success(
						`${ingressType === RTMP ? 'RTMP' : 'WHIP'} ingress created: ${url}`
					)
					closeRef?.current?.click() // Close the dialog after success
				})
				.catch(() => toast.error('Something went wrong')) // Handle error
		})
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='primary'>Generate connection</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Generate connection</DialogTitle>
				</DialogHeader>
				{/* Ingress type selection */}
				<Select
					disabled={isPending}
					value={ingressType}
					onValueChange={(value: IngressType) => setIngressType(value)}
				>
					<SelectTrigger className='w-full'>
						<SelectValue placeholder='Ingress type' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value={RTMP}>RTMP</SelectItem>
						<SelectItem value={WHIP}>WHIP</SelectItem>
					</SelectContent>
				</Select>
				{/* Warning alert */}
				<Alert>
					<AlertTriangle className='h-4 w-4' />
					<AlertTitle>Warning!</AlertTitle>
					<AlertDescription>
						This action will reset all active streams using the current connection
					</AlertDescription>
				</Alert>
				{/* Footer buttons */}
				<div className='flex justify-between'>
					<DialogClose ref={closeRef} asChild>
						<Button variant='ghost'>Cancel</Button>
					</DialogClose>
					<Button
						disabled={isPending}
						onClick={onSubmit}
						variant='primary'
					>
						Generate
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
