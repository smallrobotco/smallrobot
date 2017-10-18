export default function(){
  this.transition(
    this.toRoute(['index','consulting','development','support','blog','about']),
    this.use('toLeft'),
    this.reverse('toRight')
  )
}
