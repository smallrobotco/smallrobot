export default function(){
  this.transition(
    this.toRoute(['*']),
    this.use('toLeft'),
    this.reverse('toRight')
  );
}
