@props(['url'])
<tr>
<td class="header">
<a href="{{ $url }}" style="display: inline-block;">
<img src="{{ asset('logo.png') }}" class="logo logo-light" alt="{{ config('app.name') }}" width="200" height="50" style="width: 200px; height: 50px;">
<img src="{{ asset('logo.png') }}" class="logo logo-dark" alt="{{ config('app.name') }}" width="200" height="50" style="display: none; width: 200px; height: 50px;">
</a>
</td>
</tr>
