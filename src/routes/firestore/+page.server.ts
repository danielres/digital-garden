import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { paths } from './utils/navigation'

export const load = (async () => {
  throw redirect(303, paths.topics())
}) satisfies PageServerLoad
