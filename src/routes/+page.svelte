<script>
  import { page } from '$app/stores';
  import { enhance } from '$app/forms';

  let username = '';
  let password = '';
</script>

<h1>Login</h1>

<form method="POST" use:enhance>
  <label>
    Username:
    <input type="text" name="username" bind:value={username} required />
  </label>
  <br />
  <label>
    Password:
    <input type="password" name="password" bind:value={password} required />
  </label>
  <br />
  <button type="submit">Login</button>
</form>

{#if $page.form?.error}
  <p style="color: red;">{$page.form.error}</p>
{:else if $page.form?.success}
  <p style="color: green;">{$page.form.success}</p>
{/if}
