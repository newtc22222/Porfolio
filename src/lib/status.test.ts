import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkHealth, parseStatus } from './status.ts';

const respond = (status: number) => async () => new Response('', { status });

test('200 is up, anything else is down', async () => {
  assert.equal(await checkHealth('https://x/health', respond(200)), 'up');
  assert.equal(await checkHealth('https://x/health', respond(503)), 'down');
  assert.equal(await checkHealth('https://x/health', respond(404)), 'down');
});

test('a thrown error is down', async () => {
  const boom = async () => {
    throw new Error('network');
  };
  assert.equal(await checkHealth('https://x/health', boom), 'down');
});

test('a hung request is down after the timeout', async () => {
  const hang = (_url: string | URL | Request, init?: RequestInit) =>
    new Promise<Response>((_resolve, reject) => {
      init?.signal?.addEventListener('abort', () =>
        reject(new Error('aborted'))
      );
    });
  assert.equal(await checkHealth('https://x/health', hang, 50), 'down');
});

test('parseStatus accepts only a complete, well-formed answer', () => {
  const slugs = ['ff-restaurent', 'linguflow'];
  assert.deepEqual(
    parseStatus({ 'ff-restaurent': 'up', linguflow: 'down' }, slugs),
    { 'ff-restaurent': 'up', linguflow: 'down' }
  );
  assert.equal(parseStatus('<!doctype html>', slugs), null);
  assert.equal(parseStatus(null, slugs), null);
  assert.equal(parseStatus({ 'ff-restaurent': 'up' }, slugs), null);
  assert.equal(
    parseStatus({ 'ff-restaurent': 'up', linguflow: 'maybe' }, slugs),
    null
  );
});
