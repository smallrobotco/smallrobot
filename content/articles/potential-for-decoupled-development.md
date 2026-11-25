---
title: Potential for Decoupled Development
date: 2017-11-30T08:14:12+00:00
author: trent-stromkins
navColor: nav-light
heroBackgroundUrl: https://images.unsplash.com/photo-1668122989567-9e9d36f4539d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2748&q=80
heroLayout: hero-center
---

<p><em>Decoupled Drupal</em>, what does that even mean? When I first heard that expression, it took me a while to understand what it really meant. To be "decoupled" from something, means to remove a connection, or coupling. What we are doing is not really removing that connection, but separating it into different concerns. In the case of Drupal, we decouple the content management from the presentation completely, making Drupal an API.</p>

<p>If you know what an API is, you are going to understand what Decoupled Drupal is then, it is making Drupal an API only. By decoupling, you are able to use Drupal as a data provider for an application, website, web based application, smart watch, kiosk, TV, all of the above. The potential usage is almost crazy.</p>

<p>To share some insight, I have been using Drupal 8, as an API for multiple projects since late 2016. In that time, we (Small Robot) have built a conference schedule planner, a voting kiosk, multiple Progressive Web Apps (PWA), including the site you are currently viewing. Each one of these projects has had challenges, in each projects way, as there is not really a "guide" on how to build what you may want. In the past year and a half, at the time of writing, the tools to make Drupal work decoupled have received a lot of improvements, and there is still more work taking place.</p>

<p>Decoupling Drupal is not just about Drupal as an API, it also has a lot to do with the presentation side of things. When you do not use Drupal to output to the theme layer, you now rely on your development to make the site output anything, to any screen. This is a blessing, and a curse. Let's examine some of the pros and cons of this.</p>

