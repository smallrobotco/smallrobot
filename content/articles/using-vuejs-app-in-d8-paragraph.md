---
title: Using a Vue.js app in a D8 Paragraph
date: 2019-10-18T19:16:55+00:00
author: trent-stromkins
navColor: nav-light
heroBackgroundUrl: https://images.unsplash.com/photo-1446729444801-31245ddba81a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=80
heroColor: background-black
heroLayout: hero-center
heroOverlay: overlay-graydark
---

<p>I have had been given the task to pull data from a REST API into a Drupal 8 Paragraph, to be rendered on any specific page. The API would provide the data for a profile, showing in a listing, and a full bio.</p>

<p>I wanted to keep this as simple as possible, and at the same time, make it cool.</p>

<p>For this task, I decided to use <a href="https://vuejs.org/" target="_blank">Vue.js</a> inside a template. I felt that this would give me a way to work with Vue in a way that is not as common - inside a Drupal 8 template.</p>

<p>I created a Paragraph type called a Profile Listing. In that Paragraph, I added some fields that I would be using to control the API call. In this case, a related taxonomy, limit, and offset, and a few other fields.</p>

<h3>The Template</h3>

<p>Using a template I created for that Paragraph, I did some markup tricks to get twig to render correctly. Notice the <code>{' '}</code> wrapping the <code>{{ profile.firstname }}</code>.</p>

<pre>
<code>{# string wrapper is to prevent Twig processing the Vue vars #}
&lt;div id="App"&gt;
  &lt;div v-for="profile in profiles" class="card"&gt;
    &lt;h2 class="name"&gt;{{ '{{ profile.firstName }} {{ profile.lastName }}' }}&lt;/h2&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>

<p>This allows the HTML to not be filtered in the template. This does make it so that ticks ` have to be used instead of single quotes inside that template.</p>

<p>You can also write it this way:</p>

<pre>
<code>&lt;div id="App"&gt;
  &lt;div v-for="profile in profiles" class="card"&gt;
    &lt;h2 class="name"&gt;&lt;span v-html="profile.firstName"&gt;&lt;/span&gt; &lt;span v-html="profile.lastName"&gt;&lt;/span&gt;&lt;/h2&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>

<p>Next I pulled the CDN versions of Vue into the template, as well as Axios, a data management plugin.</p>

<pre>
<code>&lt;script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"&gt;&lt;/script&gt;
&lt;script src="https://unpkg.com/axios/dist/axios.min.js"&gt;&lt;/script&gt;</code></pre>

<p>Then inside a following script tag, I write the app. Since the app is inside the Paragraph, all field values can be used in the markup, allowing you to filter based on the values. This is a very shortened and modified version, but you get the picture.</p>

<pre>
<code>&lt;script&gt; const myApp = new Vue({
  el: '#App',
  data () {
    return {
      profiles: [],
      loaded: false
      }
    },
  methods: {
    async getProfiles(id) {
      const = 'https://example.com/api/';
      let endpoint = 'profiles' </code></pre>

<p>Notice the following API call, which includes the field values to filter the result.</p>

<pre>
<code>  try {
    const resp = await axios.get(url + endpoint + '?args[0]=
      {% if content.field_setting|field_value %}
        {{ content.field_setting|field_value }}
      {% else %}all{% endif %}
      &amp;limit={{ content.field_limit|field_value }}
      &amp;offset={{ content.field_offset|field_value }}');

      this.profiles = resp.data;
      this.loaded = true;
     }
     catch (err) {
        console.log(err)
      }
     },
   },
   mounted() {
    profileParams = 'all';
    this.getProfiles(profileParams);
  }
});
&lt;/script&gt;</code></pre>

<p>The result is pretty awesome. Now anytime that paragraph is used, the app loads the Vue app, with the REST data.</p>

