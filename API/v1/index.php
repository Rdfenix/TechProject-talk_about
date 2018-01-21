<?php

    require_once("vendor/autoload.php");

    use \Slim\Slim;
    use \Talk\Model\Post;
    use \Talk\Model\User;

    $app = new Slim();
    $app->config('debug', true);

    $app->get('/bemvindo', function(){
        echo "Bem Vindo";
    });

    $app->get('/post/list', function(){
        $post = Post::listPosts();
        echo json_encode($post);
    });

    $app->get('/commentary/list/:id', function($id){
        $comment = new Post();
        $result = $comment->listComments((int) $id);
        echo $result;
    });

    $app->get('/post/:id', function($id){
        $post = new Post();
        $result = $post->getItem((int) $id);
        echo $result;
    });

    $app->post('/post/create', function(){
        $post = new Post();
        $request = Slim::getInstance()->request();
        $result =  json_decode($request->getBody());
        $post->setData($result);
        $teste = $post->savePost();
        echo $teste;
    });

    $app->post('/user/create', function(){
        $request = Slim::getInstance()->request();
        $result =  json_decode($request->getBody());
        echo json_encode($result);
    });

    $app->run();
?>
