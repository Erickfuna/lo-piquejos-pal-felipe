controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (info.score() > 0) {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . f f f . . . . . . . . 
            . . . f f 9 9 9 f f . . . . . . 
            . . f 9 9 9 9 9 9 9 f . . . . . 
            . f f f f f f 9 9 9 f . . . . . 
            . f 6 1 1 6 6 f 9 9 9 f . . . . 
            f 6 1 1 1 6 6 b f 9 9 f f f . . 
            f 6 6 6 6 6 b b f 9 9 f 9 9 f . 
            . f b b b b b f 9 9 9 f 9 9 f . 
            . f f f f f f 9 9 9 6 f 9 9 f . 
            . f 9 9 9 9 9 9 9 9 6 f 6 6 f . 
            . f 9 9 9 9 9 9 9 6 6 f 6 6 f . 
            . f 6 9 9 9 9 9 6 6 6 f 6 6 f . 
            . f 6 6 6 6 6 6 6 6 6 f 6 6 f . 
            . f 6 6 f f f f 6 6 6 f f f . . 
            . f 6 6 f . . . f 6 6 f . . . . 
            . . f f . . . . . f f . . . . . 
            `, Nau, 0, -50)
        music.pewPew.play()
        info.changeScoreBy(-1)
    } else {
        Nau.sayText("No em queda munició!", 2000, false)
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.confetti, 500)
    info.changeScoreBy(1)
    music.smallCrash.play()
    sprite.destroy()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.fire, 500)
    scene.cameraShake(4, 500)
    music.bigCrash.play()
})
let Asteroide: Sprite = null
let projectile: Sprite = null
let Nau: Sprite = null
game.splash("EL PLANETA EXPLOTAT", "Prem A per començar i B per disparar")
effects.starField.startScreenEffect()
Nau = sprites.create(img`
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ..........fffff.
    ...ccc...ff1bbbf
    ..c1cccccccc1bbf
    ..c113333c1c11bf
    .c11333333cc11bf
    .c11c133331c11bf
    .c111cccc3c11bbf
    .f111111111ffbbf
    .ffcc11bbbbffbf.
    .fbbbbbbbbbbbbf.
    fbdbbbbbbbcbbbc.
    fdbbbbbbccbbbfbc
    fbbfcbbbbbcbbfbc
    fbfdccbbccbbfbbf
    ffddcccbbbccffbf
    .cddcccccccf..ff
    .cddcccccccf....
    ..cdbcccccf.....
    ...cbccccf......
    ....cfccf.......
    ...ffbbdc.......
    ..fbccbddc......
    .fbbcccbdc......
    fbbcffccbc......
    fbff...cbc......
    ff......cc......
    `, SpriteKind.Player)
Nau.setPosition(77, 32)
controller.moveSprite(Nau, 100, 100)
Nau.setStayInScreen(true)
info.setLife(5)
info.setScore(5)
game.onUpdateInterval(1000, function () {
    Asteroide = sprites.createProjectileFromSide(img`
        . . . . . . . . . c c 8 . . . . 
        . . . . . . 8 c c c f 8 c c . . 
        . . . c c 8 8 f c a f f f c c . 
        . . c c c f f f c a a f f c c c 
        8 c c c f f f f c c a a c 8 c c 
        c c c b f f f 8 a c c a a a c c 
        c a a b b 8 a b c c c c c c c c 
        a f c a a b b a c c c c c f f c 
        a 8 f c a a c c a c a c f f f c 
        c a 8 a a c c c c a a f f f 8 a 
        . a c a a c f f a a b 8 f f c a 
        . . c c b a f f f a b b c c 6 c 
        . . . c b b a f f 6 6 a b 6 c . 
        . . . c c b b b 6 6 a c c c c . 
        . . . . c c a b b c c c . . . . 
        . . . . . c c c c c c . . . . . 
        `, 0, 50)
    Asteroide.x += randint(0, scene.screenWidth())
    Asteroide.setKind(SpriteKind.Enemy)
})
