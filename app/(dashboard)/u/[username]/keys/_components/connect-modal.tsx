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

// Defining string types for RTMP and WHIP
const RTMP = 'RTMP'
const WHIP = 'WHIP'
type IngressType = typeof RTMP | typeof WHIP

export function ConnectModal() {
	const closeRef = useRef<ElementRef<'button'>>(null)
	const [isPending, startTransition] = useTransition()
	const [ingressType, setIngressType] = useState<IngressType>(RTMP) // Defaulting to RTMP

	// Handle form submission
	function onSubmit() {
		startTransition(() => {
			// Use the appropriate ingress type for the createIngress function
			const ingressInputType = ingressType === RTMP ? IngressInput.RTMP_INPUT : IngressInput.WHIP_INPUT;
			
			createIngress(ingressInputType) // Pass the correct IngressInput type (RTMP or WHIP)
				.then((url) => {
					toast.success(
						`${ingressType} ingress created: ${url}` // Correctly display the ingress type
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
					onValueChange={(value: IngressType) => setIngressType(value)} // Set the ingress type as a string
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
