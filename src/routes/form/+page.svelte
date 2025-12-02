<script>
  import { page } from '$app/stores';
  import { enhance } from '$app/forms';

  let email = '';
  let phone = '';
  let address = '';
  let country = '';
  let gender = '';
  let agree = false;
</script>

<div class="min-h-screen bg-gray-100 flex items-center justify-center">
  <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
    <h1 class="text-2xl font-bold mb-6 text-center">Submit Your Information</h1>

    <form method="POST" use:enhance class="space-y-4">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email:</label>
        <input id="email" type="email" name="email" bind:value={email} required
               class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
      </div>

      <div>
        <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone:</label>
        <input id="phone" type="tel" name="phone" bind:value={phone} required
               class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
      </div>

      <div>
        <label for="address" class="block text-sm font-medium text-gray-700 mb-1">Address:</label>
        <textarea id="address" name="address" bind:value={address} required
                  class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"></textarea>
      </div>

      <div>
        <label for="country" class="block text-sm font-medium text-gray-700 mb-1">Country:</label>
        <select id="country" name="country" bind:value={country} required
                class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option value="">Select Country</option>
          <option value="USA">USA</option>
          <option value="Canada">Canada</option>
          <option value="UK">UK</option>
          <option value="Australia">Australia</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label for="gender" class="block text-sm font-medium text-gray-700 mb-1">Gender:</label>
        <select id="gender" name="gender" bind:value={gender} required
                class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div class="flex items-center">
        <input id="agree" type="checkbox" name="agree" bind:checked={agree} required
               class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
        <label for="agree" class="ml-2 block text-sm text-gray-700">
          I agree to the terms and conditions
        </label>
      </div>

      <button type="submit"
              class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        Submit
      </button>
    </form>

    {#if $page.form?.error}
      <p class="mt-4 text-red-600 text-center">{$page.form.error}</p>
    {:else if $page.form?.success}
      <p class="mt-4 text-green-600 text-center">{$page.form.success}</p>
    {/if}
  </div>
</div>
