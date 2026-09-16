export const formatIsoDate = (date: string | undefined | null): string => {
	if (!date) return ''

	return new Intl.DateTimeFormat('id-ID', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
	}).format(new Date(date))
}
