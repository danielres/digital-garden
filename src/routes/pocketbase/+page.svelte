<script lang="ts">
  import { getAppContext } from './appContext'

  const app = getAppContext()
</script>

<pre>{JSON.stringify($app.user, null, 2)}</pre>
