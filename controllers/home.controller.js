

exports.home = ( req, res ) => {
    res.status( 200 ).send({
        success : true,
        message : `Welcome to Fictional-Online-Store-Server !`
    })
}