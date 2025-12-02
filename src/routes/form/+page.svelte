<script>
  import { page } from '$app/stores';
  import { enhance } from '$app/forms';

  let name = '';
  let email = '';
  let phone = '';
  let address = '';
</script>

<h1>Submit Your Information</h1>

<form method="POST" use:enhance>
  <label>
    Name:
    <input type="text" name="name" bind:value={name} required />
  </label>
  <br />
  <label>
    Email:
    <input type="email" name="email" bind:value={email} required />
  </label>
  <br />
  <label>
    Phone:
    <input type="tel" name="phone" bind:value={phone} required />
  </label>
  <br />
  <label>
    Address:
    <textarea name="address" bind:value={address} required></textarea>
  </label>
  <br />
  <button type="submit">Submit</button>
</form>

{#if $page.form?.error}
  <p style="color: red;">{$page.form.error}</p>
{:else if $page.form?.success}
  <p style="color: green;">{$page.form.success}</p>
{/if}
