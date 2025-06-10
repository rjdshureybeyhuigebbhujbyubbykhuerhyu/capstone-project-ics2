namespace SpriteKind {
    export const plat = SpriteKind.create()
}
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    if (location.row > mySprite.tilemapLocation().row) {
        if (roll <= 0) {
            jump = true
            Wile_E = 5
        }
    } else {
        roll = 0
        mySprite.vx = mySprite.vx * (-2 / 15)
    }
})
function gravity () {
    if (jumpbetter <= 0 || !(controller.A.isPressed())) {
        if (roll <= 0) {
            mySprite.vy += 9.8
        } else {
            mySprite.vy += 4.9
        }
        jumpbetter = 0
    } else {
        jumpbetter += -1
    }
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (jump || cheating) {
        if (controller.right.isPressed()) {
            mySprite.vx = rs
            roll = 25
        } else if (controller.left.isPressed()) {
            mySprite.vx = rs * -1
            roll = 25
        }
    }
})
function movement () {
    if (roll <= 0) {
        if (controller.left.isPressed()) {
            Go(-1)
        }
        if (controller.right.isPressed()) {
            Go(1)
        }
        if (controller.left.isPressed() && controller.right.isPressed() || !(controller.left.isPressed() || controller.right.isPressed())) {
            Slow_down()
        }
    }
    if (0 < roll) {
        mySprite.setImage(doSomethingelse(2))
    } else if (mySprite.vx > 0) {
        mySprite.setImage(doSomethingelse(1))
    } else if (mySprite.vx < 0) {
        mySprite.setImage(doSomethingelse(0))
    }
}
function semisolids () {
    mySprite2 = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player)
    mySprite2.setPosition(mySprite.x, mySprite.y + 3)
    for (let value of tiles.getTilesByType(assets.tile`ss`)) {
        if (mySprite2.tilemapLocation().row < value.row) {
            if (mySprite.vy > -10) {
                tiles.setWallAt(tiles.getTileLocation(value.column, value.row), true)
            }
        } else {
            tiles.setWallAt(tiles.getTileLocation(value.column, value.row), false)
        }
    }
    sprites.destroy(mySprite2)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (jump || roll > 0) {
        mySprite.vy = -150
        jump = false
        roll = 0
        jumpbetter = 5
    }
})
function varinit () {
    jump = true
    rs = 150
    ws = 100
    cheating = false
    list = [assets.image`myImage0`, assets.image`myImage2`, assets.image`myImage3`]
    lis2 = [assets.image`myImage4`, assets.image`myImage5`, assets.image`myImage6`]
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.setImage(doSomethingelse(0))
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.setImage(doSomethingelse(1))
})
function doSomething () {
    sprites.create(img`
        . 1 1 . . . . . . . . . . . . 1 1 . 
        1 a a 1 . . . . . . . . . . 1 a a 1 
        1 a a 1 . . . . . . . . . . 1 a a 1 
        . 1 1 . . . . . . . . . . . . 1 1 . 
        `, SpriteKind.Player).setPosition(66, 33)
    sprites.create(img`
        . 1 1 . . . . . . . . . . . . . . 1 1 . 
        1 a a 1 . . . . . . . . . . . . 1 a a 1 
        1 a a 1 . . . . . . . . . . . . 1 a a 1 
        . 1 1 . . . . . . . . . . . . . . 1 1 . 
        `, SpriteKind.Player).setPosition(66, 38)
    sprites.create(img`
        . 1 1 . . . . . . . . . . . . . . . . . . 1 1 . 
        1 a a 1 . . . . . . . . . . . . . . . . 1 a a 1 
        1 a a 1 . . . . . . . . . . . . . . . . 1 a a 1 
        . 1 1 . . . . . . . . . . . . . . . . . . 1 1 . 
        `, SpriteKind.Player).setPosition(66, 44)
}
function Slow_down () {
    if (jump) {
        if (10 <= mySprite.vx) {
            mySprite.vx += -10
        } else if (-10 >= mySprite.vx) {
            mySprite.vx += 10
        } else {
            mySprite.vx = 0
        }
    }
}
function doSomethingelse (_: number) {
    if (st) {
        return list[_]
    } else {
        return lis2[_]
    }
}
function Go (_11: number) {
    if (jump) {
        if (mySprite.vx * _11 <= ws - 20) {
            mySprite.vx += 20 * _11
        } else if (mySprite.vx * _11 > ws + 10) {
            mySprite.vx += -10 * _11
        } else {
            mySprite.vx = ws * _11
        }
    } else {
        if (mySprite.vx * _11 <= ws - 10) {
            mySprite.vx += 10 * _11
        } else if (mySprite.vx * _11 < ws) {
            mySprite.vx = ws * _11
        }
    }
}
function coyote_time () {
    if (jump) {
        Wile_E += -1
        if (Wile_E <= 0) {
            jump = false
        }
    }
}
let lis2: Image[] = []
let list: Image[] = []
let ws = 0
let mySprite2: Sprite = null
let rs = 0
let cheating = false
let jumpbetter = 0
let Wile_E = 0
let jump = false
let roll = 0
let mySprite: Sprite = null
let st = false
varinit()
st = game.ask("")
mySprite = sprites.create(doSomethingelse(0), SpriteKind.Player)
if (st) {
    tiles.setCurrentTilemap(tilemap`level1`)
} else {
    tiles.setCurrentTilemap(tilemap`level2`)
    tiles.placeOnRandomTile(mySprite, assets.tile`tile2`)
}
scene.cameraFollowSprite(mySprite)
game.onUpdate(function () {
    gravity()
    coyote_time()
    roll += -1
    movement()
    semisolids()
})
