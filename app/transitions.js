export default function(){
  // this.transition(
  //   this.toRoute(['*']),
  //   this.use('toLeft'),
  //   this.reverse('toRight')
  // );
  // this.transition(
  //   this.toRoute(['home','about','consulting','development','support', 'pricing','contact','blog','blog.post','notfound']),
  //   this.use('fade', { duration: 500 })
  // );
  const duration = 500;
  this.transition(
    this.use('toUp', { duration })
  );
}


