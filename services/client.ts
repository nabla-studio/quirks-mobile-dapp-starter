import { osmosis } from '@nabla-studio/chain-registry'
import ky from 'ky';

export const client = ky.create({
	prefixUrl: osmosis.apis?.rest![0].address,
});