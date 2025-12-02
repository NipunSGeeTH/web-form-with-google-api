<script>
  import { page } from '$app/stores';
  import { enhance } from '$app/forms';

  let username = '';
  let password = '';
</script>

<div class="min-h-screen bg-gray-100 flex items-center justify-center">
  <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
    <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>

    <form method="POST" use:enhance class="space-y-4">
      <div>
        <label for="username" class="block text-sm font-medium text-gray-700 mb-1">Username:</label>
        <input id="username" type="text" name="username" bind:value={username} required
               class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password:</label>
        <input id="password" type="password" name="password" bind:value={password} required
               class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
      </div>

      <button type="submit"
              class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        Login
      </button>
    </form>

    {#if $page.form?.error}
      <p class="mt-4 text-red-600 text-center">{$page.form.error}</p>
    {:else if $page.form?.success}
      <p class="mt-4 text-green-600 text-center">{$page.form.success}</p>
    {/if}
  </div>
</div>
